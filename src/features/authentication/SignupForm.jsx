import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useForm} from "react-hook-form";
import {useSignUp} from "./useSignUp.js";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const {register, handleSubmit, formState: {errors}, getValues, reset} = useForm()
    const {signUp, isPending} = useSignUp()
    function onSubmit({fullName, email, password}){
        signUp({fullName, email, password}, {
            onSettled: reset
        })
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={""} errors={errors?.fullName?.message}>
                <Input disabled={isPending} type="text" id="fullName" {...register('fullName', {
                    required: "This field is required"
                })} />
            </FormRow>

            <FormRow label="Email address" errors={errors?.email?.message}>
                <Input disabled={isPending} type="email" id="email" {...register('email', {
                    required: "This field is required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please provide a valid email address"
                    }
                })}/>
            </FormRow>

            <FormRow label="Password (min 8 characters)" errors={errors?.password?.message}>
                <Input disabled={isPending} type="password" id="password" {...register('password', {
                    required: "This field is required",
                    minLength: {
                        value: 8,
                        message: "Password needs a minimum of 8 characters"
                    }
                })}/>
            </FormRow>

            <FormRow label="Repeat password" errors={errors?.passwordConfirm?.message}>
                <Input disabled={isPending} type="password" id="passwordConfirm" {...register('passwordConfirm', {
                    required: "This field is required",
                    validate: (value) => value === getValues().password || "Passwords need to match"
                })}/>
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button disabled={isPending} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
