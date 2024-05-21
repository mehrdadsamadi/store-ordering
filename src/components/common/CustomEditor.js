import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

const editorConfiguration = {
    toolbar: Editor.builtinPlugins.map(plugin => plugin.pluginName),
};

export default function CustomEditor(props) {
    return (
        <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={props?.initialData || '<h1>در این قسمت میتوانید به صورت کامل توضیحات همراه با تصاویر برای محصول قرار دهید.</h1>'}
            onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
            }}
        />
    )
}
