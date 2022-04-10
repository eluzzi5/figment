// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 300, height: 400 });
figma.on('selectionchange', () => {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
        figma.ui.postMessage({ type: 'none-selected' });
    }
    else if (selection != null) {
        console.log('the node isnt null');
        if ((selection[0].type === "RECTANGLE") || (selection[0].type === "FRAME")) {
            if (selection[0].type === "RECTANGLE") {
                const iThinkThisIsRect = figma.currentPage.selection[0];
                const selected_image = iThinkThisIsRect.name;
                figma.ui.postMessage({ type: 'image-selected', selected_image });
            }
            if (selection[0].type === "FRAME") {
                const iThinkThisIsFrame = figma.currentPage.selection[0];
                const selected_image = iThinkThisIsFrame.name;
                figma.ui.postMessage({ type: 'image-selected', selected_image });
            }
        }
        if ((selection[0].type === "TEXT") || (selection[0].type === "STICKY") || (selection[0].type === "FRAME") || (selection[0].type === "SHAPE_WITH_TEXT")) {
            if (selection[0].type === 'TEXT') {
                const iThinkThisIsText = figma.currentPage.selection[0];
                const selected_text = iThinkThisIsText.characters;
                figma.ui.postMessage({ type: 'text-selected', selected_text });
                console.log(selected_text);
            }
            else if (selection[0].type === "STICKY") {
                const iThinkThisIsSticky = figma.currentPage.selection[0];
                const selected_text = iThinkThisIsSticky.text.characters;
                figma.ui.postMessage({ type: 'text-selected', selected_text });
                console.log(selected_text);
            }
            else if (selection[0].type === "FRAME") {
                const iThinkThisIsFrame = figma.currentPage.selection[0];
                const texts = iThinkThisIsFrame.findAll(n => n.type === "TEXT");
                const selected_text = texts[0].characters;
                figma.ui.postMessage({ type: 'text-selected', selected_text });
                console.log(selected_text);
            }
            else if (selection[0].type === "SHAPE_WITH_TEXT") {
                const iThinkThisIsShape = figma.currentPage.selection[0];
                const selected_text = iThinkThisIsShape.text.characters;
                figma.ui.postMessage({ type: 'text-selected', selected_text });
                console.log(selected_text);
            }
        }
    }
});
function successCallback(result) {
    console.log("font loaded: " + result);
}
function failureCallback(error) {
    console.error("font not loaded: " + error);
}
figma.listAvailableFontsAsync().then(successCallback, failureCallback);
figma.loadFontAsync({ family: "Inter", style: "Regular" }).then(successCallback, failureCallback);
figma.loadFontAsync({ family: "Inter", style: "Medium" }).then(successCallback, failureCallback);
figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then(successCallback, failureCallback);
figma.ui.onmessage = msg => {
    if (msg.type === 'placeholder-frame') {
        const nodes = [];
        const frame = figma.createFrame();
        const txt = figma.createText();
        txt.characters = 'something will appear here shortly';
        txt.fontName = { family: "Roboto", style: "Regular" };
        txt.textAutoResize = 'WIDTH_AND_HEIGHT';
        txt.resize(100, 100);
        txt.x = 10;
        txt.y = 10;
        frame.appendChild(txt);
        figma.currentPage.appendChild(frame);
        nodes.push(frame);
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
    }
    if (msg.type === 'placeholder-text') {
        if (figma.editorType === "figjam") {
            const nodes = [];
            const stickynote = figma.createSticky();
            const txt = figma.createText();
            txt.characters = 'something will appear here shortly';
            figma.currentPage.appendChild(stickynote);
            nodes.push(stickynote);
            figma.currentPage.appendChild(txt);
            const newSelection = [];
            newSelection.push(txt);
            newSelection.push(stickynote);
            figma.currentPage.selection = newSelection;
            figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
        }
        else {
            const nodes = [];
            const frame = figma.createFrame();
            const txt = figma.createText();
            txt.characters = 'something will appear here shortly';
            txt.fontName = { family: "Roboto", style: "Regular" };
            txt.textAutoResize = 'WIDTH_AND_HEIGHT';
            txt.resize(100, 100);
            txt.x = 10;
            txt.y = 10;
            frame.appendChild(txt);
            figma.currentPage.appendChild(frame);
            nodes.push(frame);
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection);
        }
    }
    if (msg.type === 'set-style') {
        const selection = figma.currentPage.selection[0];
        console.log('selection selected');
    }
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    // if (msg.type === 'create-rectangles') {
    //   const nodes: SceneNode[] = [];
    //   for (let i = 0; i < msg.count; i++) {
    //     // const rect = figma.createRectangle();
    //     // rect.x = i * 150;
    //     // rect.fills = [{type: 'SOLID', color: {r: 255, g: 255, b: 255}}];
    //     // figma.currentPage.appendChild(rect);
    //     // nodes.push(rect);
    //     const txt = figma.createText()
    //     txt.characters = 'something will appear here shortly';
    //     txt.fontName = { family: "Inter", style: "Regular" };
    //     figma.currentPage.appendChild(txt);
    //     nodes.push(txt);
    //   }
    //   figma.currentPage.selection = nodes;
    //   figma.viewport.scrollAndZoomIntoView(nodes);
    // }
    // for (const node of figma.currentPage.selection) {
    //   if (node != null){
    //     console.log("the node isn't null")
    //     figma.ui.postMessage({ type: 'selected' })
    //   }
    // check if text is selected
    // const textNodes = figma.currentPage.findAllWithCriteria({
    //   types: ['TEXT']
    // })
    // if (textNodes.length > 0){
    //   figma.ui.postMessage({ type: 'text-selected' })
    // }
    // figma.showUI(
    //   __html__,
    //   { width: 300, height: 800, title: "Figment", position: { x: 100, y: 100 } }
    // )
    // Calls to "parent.postMessage" from within the HTML page will trigger this
    // callback. The callback will be passed the "pluginMessage" property of the
    // posted message.
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
};
