
# Mui Elements for PD

## Chatbox Component
Code: `src/app/page.tsx`
Page: [`http://localhost:3000/`](http://localhost:3000/)

The chatbox is separated into three different react elements:
 1. `<ChatMsg message={} />` renders a message bubble in the chat box, if the message sender is "You" it will be aligned to the right.
 2. `<ChatBox />` renders a container with a text form and the chat log which will auto scroll when a new message is recieved.
 3. `<ChatButton />` renders a button icon which displays the chatbox when clicked. This is the root element.
 
`<ChatBox />` has a `handleSubmit()` function which runs when a user submits the text form. Code to send a Socket IO message has not been written but should go at the end of this function.

No code has been written to receive messages but a `newMessage()` function exists in `<ChatBox />` which will add a new message and update the chatlog.

## Editor Components
Page: [`http://localhost:3000/editor`](http://localhost:3000/editor)
### Editor Layout
Code: `src/app/editor/page.tsx`
PD Equivalent: `apps/web/src/pages/admin/editor/[id].tsx`

Contains some test data that should be removed when integrated into Delta.
Resizeable layout created using `react-resizable-panels`.

### Object Catalogue Panel
Code: `src/app/common/containers/editor/objectCataloguePanel.tsx`

Main features to note are:

 - The data given to the stage when a item is dropped onto comes from the `setDragData()` function of the `<CatalogueItem />` element.
 - When a files is uploaded the `fileUpload()` function of the `<ProjectMedia />` element receives the file.

### Stage
Code: `src/app/common/containers/editor/stage.tsx`
Demo of R3F Canvas receiving drag/drop data from the OCP.
