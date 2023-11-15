import { Router } from "express";
import { getEndpoint1, getEndpoint10, getEndpoint11, getEndpoint12, getEndpoint13, getEndpoint14, getEndpoint15, getEndpoint16, getEndpoint17, getEndpoint2, getEndpoint3, getEndpoint4, getEndpoint5, getEndpoint6, getEndpoint7, getEndpoint8, getEndpoint9 } from "../controllers/Endpoints.controllers.js";

const routes = Router();

routes.get("/endpoint1", getEndpoint1)
routes.get("/endpoint2", getEndpoint2)
routes.get("/endpoint3", getEndpoint3)
routes.get("/endpoint4", getEndpoint4)
routes.get("/endpoint5/:id", getEndpoint5)
routes.get("/endpoint6", getEndpoint6)
routes.get("/endpoint7", getEndpoint7)
routes.get("/endpoint8", getEndpoint8)
routes.get("/endpoint9", getEndpoint9)
routes.get("/endpoint10", getEndpoint10)
routes.get("/endpoint11", getEndpoint11)
routes.get("/endpoint12/:id", getEndpoint12)
routes.get("/endpoint13", getEndpoint13)
routes.get("/endpoint14", getEndpoint14)
routes.get("/endpoint15", getEndpoint15)
routes.get("/endpoint16", getEndpoint16)
routes.get("/endpoint17", getEndpoint17)

export default routes;