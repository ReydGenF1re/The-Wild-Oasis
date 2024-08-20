import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateSetting as updateSettingApi} from "../../services/apiSettings.js";
import toast from "react-hot-toast";

export function useUpdateSetting(){
    const client = useQueryClient();
    const {mutate: updateSetting, isPending: isUpdating} = useMutation({
        mutationFn: updateSettingApi,
        mutationKey: ['settings'],
        onSuccess: () => {
            toast.success("Setting has been successfully edited 😘")
            client.invalidateQueries({queryKey: ['settings']})
        },
        onError: () => {
            toast.error("Setting hasn't been edited 😭")
        }
    })
    return {updateSetting, isUpdating}
}
