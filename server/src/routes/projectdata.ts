import { Request, Response, Router } from "express";
import Project from "../entity/Project";

import ProjectData from "../entity/ProjectData";
import User from "../entity/User";
import auth from "../middlewears/auth";
import user from "../middlewears/user";


const createProjectData = async (req: Request, res: Response) => {
    const {  itemDescription,Quantitiy,unitBudget,project,unit } = req.body;
    const totalBudget = req.body.unitBudget * Quantitiy ;
    let errors: any = {};
   // console.log(res.locals.user)
    try {
    //  const project =await Project.findOne(projectId);
       // const user = await User.findOne(res.locals.user.id)
       // const project = await Project.findOne( res.locals.user.id)
        console.log("create ProjctData")

console.log(itemDescription);
console.log(Quantitiy);
console.log(unitBudget);
console.log(totalBudget);
 console.log(project);
console.log(unit);

       if (!unit) errors.unit = "cannot be empty !!";
        if (!itemDescription) errors.itemDescription = "cannot be empty !!";
        if (Object.keys(errors).length > 0) throw new Error("cannot be empty !!")
        console.log(" before Save")
        const data = await new ProjectData({itemDescription,Quantitiy,unitBudget,totalBudget,project,unit}).save()
       // const newProjectdata = await new ProjectData({ itemDescription,Unit ,Pro}).save()
        console.log(" After Save")
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        switch (error.message) {
            case "cannot be empty !!":
                return res.status(401).json(errors);

            default:
                return res.status(500).json({ error: "something went wrong" });
        }
    }
}









   const getAllProjectData = async (_:Request , res:Response)=>{

    try{
        const projectsdataAll = await ProjectData.find();
        return res.status(200).json(projectsdataAll);
        
    }catch(error){
        console.log("error");
        return res.status(500).json({ error: "something went wrong" });

    }
   }


   /* get projectdata by projectid */
   const getProjectDataByProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    //const { id } = req.body;
    console.log(id)
    try {
        const projectdata = await ProjectData.find({ where: { projectid:id } });
        console.log(projectdata)
        if (!projectdata) throw new Error("Projectdata not found");
        return res.status(200).json(projectdata);
    } catch (error) {
        switch (error.message) {
            case "Project not found":
                return res.status(404).json({ error: error.message });
            default:
                return res.status(500).json({ error: "something went wrong" });
        }
    }
};

/** summ of totalcost of project Data */

const getProjectData = async (req: Request, res: Response) => {
    const { id } = req.params;
     //const { id } = req.body;
        console.log(id)
        try {
          const projectsData = await ProjectData.find({ where: { project:id } });
          console.log(projectsData)
          if (!projectsData) throw new Error("article not found");
        //   var cost=0;
        //   projectsData.forEach(element=>
        //  cost+= element.totalBudget
        // )
        // console.log(cost)
         
          return res.status(200).json(projectsData);

        } catch (error) {
            console.log(error);
          switch (error.message) {
         
            case "article not found":
              return res.status(404).json({ error: error.message });
            default:
              return res.status(500).json({ error: "something went wrong" });
          }
        }
      };

      const getsumprojectdata = async (req: Request, res: Response) => {
         const { id } = req.params;
     //const { id } = req.body;
        console.log(id)
        try {
          const projectsData = await ProjectData.find({ where: { project:id } });
          console.log(projectsData)
          if (!projectsData) throw new Error("article not found");
          var cost=0;
          projectsData.forEach(element=>
         cost+= element.totalBudget
        )
        console.log(cost)
         
          return res.status(200).json(cost);

        } catch (error) {
            console.log(error);
          switch (error.message) {
         
            case "article not found":
              return res.status(404).json({ error: error.message });
            default:
              return res.status(500).json({ error: "something went wrong" });
          }
        }
          };

const router = Router();

router.get("/sumprojectdata/:id",user,auth,getsumprojectdata)
router.get("/",user,auth,getAllProjectData)
router.get("/:id", user, auth, getProjectData);

router.post("/", user, auth, createProjectData);
export default router;