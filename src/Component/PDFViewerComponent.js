import React from 'react';
import PDFViewer from 'pdf-viewer-reactjs'

function PdfViewerComponent(props) {
    console.log(props.data)
    return (
        <object width="100%" height="800" data={props.data.url} type="application/pdf">
            {" "}
        </object>
    );
}

export default PdfViewerComponent;