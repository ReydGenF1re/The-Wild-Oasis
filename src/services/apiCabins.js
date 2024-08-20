import {supabase, supabaseUrl} from "./supabase.js";
import CyrillicToTranslit from 'cyrillic-to-translit-js';


export async function getCabins() {
    const {data: cabins, error} = await supabase
        .from('cabins')
        .select('*')
    if (error) {
        console.error(error);
    }
    return cabins;
}

export async function deleteCabin(id) {
    const {data, error} = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
    if (error) {
        console.error(error)
    }
    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
    // There was an error uploading an image with cyrillic name, it should fix it ^)

    const cyrillicToTranslit = new CyrillicToTranslit();
    const fixedImageName = cyrillicToTranslit.transform(newCabin?.image?.name)

    const imageName = `${Math.random()}-${fixedImageName}`.replaceAll('/', '');

    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from('cabins')

    if (!id) {
        // Creating a cabin
        query = query.insert([
            {...newCabin, image: imagePath}
        ])
    } else {
        // Editing a cabin
        query = query
            .update({...newCabin, image: imagePath})
            .eq('id', id)
    }

    const {data, error} = await query.select().single()

    if (error) {
        console.error(error)
    }

    // Uploading an image
    // if (hasImagePath) return data;

    const {error: storageError} = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    // Deleting if there was an error uploading an image
    if (storageError) {
        await deleteCabin(newCabin.id)
        throw new Error('Cabin could not be created, something went wrong with an image😓')
    }

    return data;
}