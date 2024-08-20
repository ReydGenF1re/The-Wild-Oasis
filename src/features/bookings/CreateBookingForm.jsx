import React from 'react';
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import {useForm} from "react-hook-form";
import Spinner from "../../ui/Spinner.jsx";
import {subtractDates} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import useCreateBooking from "./useCreateBooking.js";


function CreateBookingForm(onCloseModal) {
    const {register, formState: {errors}, handleSubmit, getValues, reset} = useForm()
    const {createBooking, isCreating} = useCreateBooking()

    function onSubmit(data) {
        createBooking(data,{
            onSuccess: () => {
                reset();
                onCloseModal?.()
            }});
    }

    function onError(error) {
        console.error(error, error.message)
    }

    if (isCreating) return <Spinner/>
    return (

        <Form type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label={'Cabin name'} errors={errors?.cabinName?.message}>
                <Input type={'text'} id={'cabinName'} {...register('name', {required: "This field is required"})} />
            </FormRow>
            <FormRow label={'Full name'} errors={errors?.fullName?.message}>
                <Input type={'text'} id={'fullName'} {...register('fullName', {required: "This field is required"})} />
            </FormRow>
            <FormRow label={'Number of guests'} errors={errors?.numGuests?.message}>
                <Input type={'number'} id={'numGuests'} {...register('numGuests', {
                    required: "This field is required",
                    min: 1
                })} />
            </FormRow>
            <FormRow label={'Start date'} errors={errors?.startDate?.message}>
                <Input type={'date'}
                       id={'startDate'} {...register('startDate', {required: "This field is required"})} />
            </FormRow>
            <FormRow label={'End date'} errors={errors?.endDate?.message}>
                <Input type={'date'} id={'endDate'} {...register('endDate', {
                    required: "This field is required",
                    validate: value => subtractDates(value, getValues().startDate) > 0 || "Please provide a valid end date (End date must be later than start date)"
                })} />
            </FormRow>
            <FormRow label={'Observations'} errors={errors?.observations?.message}>
                <Input type={'text'} id={'observations'} {...register('observations')} />
            </FormRow>
            <FormRow>
                <Button>Submit</Button>
            </FormRow>
        </Form>
    );
}

export default CreateBookingForm;