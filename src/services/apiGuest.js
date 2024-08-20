import {supabase} from "./supabase.js";
import {countriesFlags} from "../utils/countries.js";
import {PAGE_SIZE} from "../utils/constants.js";

export async function getGuests({page}) {
    let query =supabase
        .from('guests')
        .select('*', {count: 'exact'})
    if(page){
        const from = (page-1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1
        query = query.range(from ,to)
    }
    const {data: guests, error, count} = await query
    if (error) {
        console.error(error);
    }
    return {guests, count}
}
export async function createGuest(newGuest){
    const nationalID = countriesFlags[newGuest.nationality].nationalID;
    const countryFlag = countriesFlags[newGuest.nationality].normal;

    const finalGuest = {
        ...newGuest,
        nationalID,
        countryFlag

    }

    const { error } = await supabase.from("guests").insert([finalGuest]);
    if (error) console.log(error.message);
}

