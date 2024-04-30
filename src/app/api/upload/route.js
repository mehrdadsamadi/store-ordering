import fs from "fs"
import path from "path"

export async function POST(req) {
    const data = await req.formData()

    if (data.get("file")) {
        const file = data.get("file")

        const folderName = req.url.split('=')[1]
        const ext = file.name.split(".").slice(-1)[0]
        const newFileName = new Date().valueOf() + "." + ext
        const uploadPath = path.join(__dirname, "..", "..", "..", "..", "..", "public", "images", folderName, newFileName)

        const chunks = []
        for await(const chunk of file.stream()) {
            chunks.push(chunk)
        }
        const buffer = Buffer.concat(chunks)
        
        try {
            fs.writeFileSync(uploadPath, buffer, 'binary');
        } catch (error) {
            console.log("upload error ->", error);
        }

        return Response.json(`/images/${folderName}/${newFileName}`)
    }
    return Response.json(true)
}