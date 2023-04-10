import { Router } from "express";
import multer from "multer";
import { getRepository } from "typeorm";
import uploadConfig from "../../src/config/upload"
import { TypeImages } from "../modules/instrument/entities/TypeImages";
import { CreateTypeImagesController } from "../modules/instrument/useCases/TypeImages/createTypeImages/createTypeImagesController";
import { ListTypeImagesController } from "../modules/instrument/useCases/TypeImages/listTypeImages/ListTypeImagesController";

const typeImagesRoutes = Router ();
const typeImages = multer(uploadConfig.upload("./tmp/so_images"))

const createTypeImages = new CreateTypeImagesController;
const listTypeImages = new ListTypeImagesController;

typeImagesRoutes.post("/", typeImages.single("file"), createTypeImages.handle);

typeImagesRoutes.get("/", (listTypeImages.handle));

typeImagesRoutes.put("/delete", async (request, response) => {
    try {
        const {typeImages_id, image_url} = request.body;

        const typeImagesRepository = getRepository(TypeImages);

        const cancel = {
            typeImages_id: typeImages_id,
            image_url,
            cancel: 'Y'
        }

        await typeImagesRepository.save(cancel)
        return response.send("Imagem excluída.")
    } catch (error) {
        return response.status(400).json({error})
    }
});

typeImagesRoutes.put("/select", async (request, response) => {
    try {
        const {typeImages_id, image_url, selected} = request.body;

        const typeImagesRepository = getRepository(TypeImages);

        const select = {
            typeImages_id: typeImages_id,
            image_url,
            selected,
        }

        const saved = await typeImagesRepository.save(select)
        return response.status(200).json({select})
    } catch (error) {
        return response.status(400).json({error})
    }
})

export {typeImagesRoutes};
