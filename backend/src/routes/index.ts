import { Router } from "express";
import songController from "../controllers/songController";

const router = Router();

export default (): Router => {
    songRoutes(router);

    return router;
};

const songRoutes = (router: Router) => {
    router.route('/songs')
        .get(songController.getAll)
        .post(songController.create);

    router.route('/songs/:id')
        .get(songController.getOne)
        .put(songController.update)
        .delete(songController.delete);

    router.get('/stats', songController.getStats)
}

