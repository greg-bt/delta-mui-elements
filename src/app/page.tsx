'use client'

/*

Chatbox



*/

import { Box, Button, ClickAwayListener, Grow, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, FormEventHandler, useEffect, useRef, useState } from "react";


export default function Home() {
    return (
        <main style={{ height: "100vh", backgroundSize: "cover", backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/c/cb/A_U.S._Navy_F-A-18E_Super_Hornet_aircraft_assigned_to_Strike_Fighter_Squadron_(VFA)_14_participates_in_an_air_power_demonstration_near_the_aircraft_carrier_USS_John_C._Stennis_(CVN_74)%2C_not_shown%2C_in_the_Pacific_130424-N-TC437-585.jpg')" }}>

            <ChatButton />

        </main>
    )
}


type Message = {
    sender: string
    text: string
}

type ChatMsgProps = {
    message: Message
}

const ChatMsg = ({ message }: ChatMsgProps) => {

    const remote = !(message.sender === "You");

    return (
        <Box sx={{ display: "flex", justifyContent: remote ? "flex-start" : "flex-end" }} >
            <Box>
                <Typography
                    variant="caption"
                    sx={{ display: "block", textAlign: remote ? "left" : "right" }}>
                    {message.sender}
                </Typography>
                <Paper
                    sx={{
                        p: 1.5,
                        backgroundColor: `rgba(${remote ? '169, 213, 231' : '228, 228, 228'}, 0.8)`,
                        borderRadius: `${remote ? "" : "18px"} 3px 18px 18px`,
                    }}
                >
                    <Typography sx={{ wordWrap: "break-word", maxWidth: "20vw" }} variant="body2">
                        {message.text}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    )

}

const ChatBox = () => {

    const [messages, setMessages] = useState([{ sender: "Delta Message Bot", text: "Connected to msg server!" }]);

    // Send message to chat
    const msgBox = useRef<HTMLInputElement>(null);

    function newMessage(msg: Message) {
        setMessages([...messages, msg])
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (msgBox.current == null || msgBox.current.value == "") return;
        newMessage({ sender: "You", text: msgBox.current.value });
        msgBox.current.value = "";

        // SOCKET IO SEND MSG HERE
    }

    // Recieve Message
    { }

    // Scroll down the chatlog when rerendering
    const chatBottom = useRef<HTMLInputElement>(null);
    useEffect(() => { chatBottom.current?.scrollIntoView({ behavior: "smooth" }) }, [messages]);

    return (
        <>
            { /* Chat Log */}
            <Box sx={{ p: 1, mb: 1, height: "calc( 50vh - 38px - 2em )", overflowY: "scroll", }}>
                {messages.map((msg, i)=> <ChatMsg key={i} message={msg} />)}
                <div ref={chatBottom} />
            </Box>

            { /* Msg Box */}
            <Box sx={{ borderRadius: "10px", backdropFilter: "blur(18px)" }}>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <TextField id="chatinput" inputRef={msgBox} variant="standard" fullWidth
                        InputProps={{
                            endAdornment:
                                <Button type="submit" size="small" variant="contained">{">"}</Button>
                        }}
                    />
                </form>
            </Box>

        </>
    )
}

const ChatButton = () => {

    const [open, setOpen] = useState(false);
    //const switchOpen = 

    return (
        <ClickAwayListener mouseEvent="onMouseDown" onClickAway={() => { if (open) setOpen(false) }}>
            <Box
                onClick={() => { setOpen(true) }}
                sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",

                    transition: "all .3s",
                    backgroundColor: `rgba(250, 250, 250, ${open ? '0' : '.6'})`,
                    borderRadius: "15px",

                    width: "45px",
                    height: "45px",
                }}>

                <Grow in={open} style={{ transformOrigin: 'bottom right' }}>

                    <Box
                        sx={{
                            p: 2,

                            position: "absolute",
                            bottom: "0px",
                            right: "0px",

                            borderRadius: "15px",
                            backdropFilter: "blur(8px)",
                            backgroundColor: "rgba(255, 255, 255, 0.3)",

                            height: "50vh",
                            width: "30vw"
                        }}>
                        <ChatBox />
                    </Box>

                </Grow >

            </Box>
        </ClickAwayListener>
    )
}
