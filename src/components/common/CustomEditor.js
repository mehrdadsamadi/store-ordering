import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

// const UPLOAD_ENDPOINT = process.env.DOMAIN + 'api/upload?folder=productDesc'

// const uploadAdapter = (loader) => {
//     return {
//         upload: () => {
//             return new Promise((resolve, reject) => {
//                 const body = new FormData()
//                 loader.file.then(file => {
//                     body.append("uploadImg", file)
//                     fetch(`${UPLOAD_ENDPOINT}`, {
//                         method: "POST",
//                         body
//                     })
//                         .then(res => res.json())
//                         .then(res => {
//                             resolve({default: `${process.env.DOMAIN}${res.url}`})
//                         })
//                         .catch(err => reject(err))
//                 })
//             }) 
//         }
//     }
// }

// const uploadPlugin = (editor) => {
//     editor.plugin.get("FileRepository").createUploadAdapter = (loader) => {
//         return uploadAdapter(loader)
//     }
// }

const editorConfiguration = {
    // plugins: [uploadPlugin],
    toolbar: Editor.builtinPlugins.map(plugin => plugin.pluginName),
};

export default function CustomEditor({data, setData}) {
    return (
        <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={data || '<h1>در این قسمت میتوانید به صورت کامل توضیحات همراه با تصاویر برای محصول قرار دهید.</h1>'}
            onChange={(event, editor) => {
                const data = editor.getData();
                setData(data)
            }}
        />
    )
}
