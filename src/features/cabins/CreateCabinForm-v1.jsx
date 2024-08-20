import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";

function CreateCabinForm() {
    const {register, handleSubmit, reset, getValues, formState: {errors}} = useForm()

    const client = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: createEditCabin,
        mutationKey: ['cabins'],
        onSuccess: () => {
            toast.success("Cabin has successfully been created 😘")
            client.invalidateQueries({queryKey: ['cabins']})
            reset()
        },
        onError: () => {
            toast.error("Cabin hasn't been created 😭")
        }
    })

    function onSubmit(data) {
        console.log(data)
        mutate({...data, image: data.image[0]})
    }

    function onError(err) {
        console.error(err)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow errors={errors?.name?.message} label={'Cabin name'}>
                <Input {...register('name', {required: "This field is required"})} type="text" id="name"/>
            </FormRow>

            <FormRow errors={errors?.maxCapacity?.message} label={'Maximum capacity'}>
                <Input type="number" {...register('maxCapacity', {required: "This field is required"})}
                       id="maxCapacity"/>
            </FormRow>

            <FormRow errors={errors?.regularPrice?.message} label={'Regular price'}>
                <Input type="number" {...register('regularPrice', {required: "This field is required"})}
                       id="regularPrice"/>
            </FormRow>

            <FormRow errors={errors?.discount?.message} label={'Discount'}>
                <Input {...register('discount', {
                    required: "This field is required",
                    validate: value => Number(value) <= Number(getValues().regularPrice) || 'Discount should be less than price'
                })} type="number" id="discount" defaultValue={0}/>
            </FormRow>

            <FormRow errors={errors?.description?.message} label={'Description for website'}>
                <Textarea {...register('description', {required: "This field is required"})} type="text"
                          id="description" defaultValue=""/>
            </FormRow>

            <FormRow errors={errors?.image?.message} label={'Cabin photo'}>
                <FileInput {...register('image', {required: "This field is required"})} id="image" accept="image/*"/>
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Create</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
