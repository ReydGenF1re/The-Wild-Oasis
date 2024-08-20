import React from 'react';
import {useForm} from "react-hook-form";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import Button from "../../ui/Button.jsx";
import {useCreateGuest} from "./useCreateGuest.js";

function CreateGuestForm() {
    const {register, handleSubmit, formState: {errors}, reset} = useForm({ defaultValues: '' })
    const {createGuest, isCreating} = useCreateGuest()
    function onSubmit(data){
        createGuest(data,{
            onSuccess:() => reset()
        });
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={""} errors={errors?.fullName?.message}>
                <Input disabled={isCreating} type="text" id="fullName" {...register('fullName', {
                    required: "This field is required"
                })} />
            </FormRow>

            <FormRow label="Email address" errors={errors?.email?.message}>
                <Input disabled={isCreating} type="email" id="email" {...register('email', {
                    required: "This field is required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please provide a valid email address"
                    }
                })}/>
            </FormRow>

            <FormRow label="Nationality" errors={errors?.nationality?.message}>
                <Input disabled={isCreating} type="text" id="nationality" {...register('nationality', {
                    required: "This field is required",
                })}/>
            </FormRow>


            <FormRow>
                {/* type is an HTML attribute! */}
                <Button disabled={isCreating} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Create new guest</Button>
            </FormRow>
        </Form>
    );
}

export default CreateGuestForm;