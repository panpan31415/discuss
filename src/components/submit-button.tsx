import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

type FormButtonProps = {
    children: React.ReactNode;
};

export default function FormButton({ children }: FormButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button
            type='submit'
            isLoading={pending}
            color={"primary"}>
            {children}
        </Button>
    );
}
