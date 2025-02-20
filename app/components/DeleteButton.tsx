"use client"
import { Button } from "@mui/material";


export default function DeleteButton({buttonAction, buttonText} : {buttonAction: () => void, buttonText: string}) {

     return (
        <>
        <Button
            onClick={buttonAction}
            variant="contained"
            color="error"
            sx={{ padding: '10px 20px' }} // Add additional styles if needed
        >
            {buttonText}
        </Button>
        </>
    );
}