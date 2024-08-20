import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
    const {id: editId, ...editValues} = cabinToEdit;
    const isEditSession = Boolean(editId);
    const {register, handleSubmit, reset, getValues, formState: {errors}} = useForm({
        defaultValues: isEditSession ? editValues : {}
    })
    const {createCabin, isCreating} = useCreateCabin()
    const {editCabin, isEditing} = useEditCabin()
    const isWorking = isCreating || isEditing

    function onSubmit(data) {
        const image = typeof data.image === 'string' ? data.image : data.image[0]
        if (isEditSession) editCabin({newCabin: {...data, image}, id: editId}, {
            onSuccess: () => {
                reset()
                onCloseModal?.()
            }
        })
        else createCabin({...data, image}, {
            onSuccess: () => {
                reset();
                onCloseModal?.()
            },

        })
    }

    function onError(err) {
        console.error(err)
    }

    return (
        <Form type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow errors={errors?.name?.message} label={'Cabin name'}>
                <Input disabled={isWorking} {...register('name', {required: "This field is required"})} type="text"
                       id="name"/>
            </FormRow>

            <FormRow errors={errors?.maxCapacity?.message} label={'Maximum capacity'}>
                <Input disabled={isWorking}
                       type="number" {...register('maxCapacity', {required: "This field is required"})}
                       id="maxCapacity"/>
            </FormRow>

            <FormRow errors={errors?.regularPrice?.message} label={'Regular price'}>
                <Input disabled={isWorking}
                       type="number" {...register('regularPrice', {required: "This field is required"})}
                       id="regularPrice"/>
            </FormRow>

            <FormRow errors={errors?.discount?.message} label={'Discount'}>
                <Input disabled={isWorking} {...register('discount', {
                    required: "This field is required",
                    validate: value => Number(value) <= Number(getValues().regularPrice) || 'Discount should be less than price'
                })} type="number" id="discount" defaultValue={0}/>
            </FormRow>

            <FormRow errors={errors?.description?.message} label={'Description for website'}>
                <Textarea disabled={isWorking} {...register('description', {required: "This field is required"})}
                          type="text"
                          id="description" defaultValue=""/>
            </FormRow>

            <FormRow errors={errors?.image?.message} label={'Cabin photo'}>
                <FileInput disabled={isWorking} {...register('image', {
                    required: isEditSession ? false : "This field is required"
                })} id="image" accept="image/*"/>
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button onClick={() => onCloseModal?.()} disabled={isWorking} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button  disabled={isWorking}>{isEditSession ? 'Edit a cabin' : 'Create a cabin'}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
