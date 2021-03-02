import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { Request, Response } from "express";

class NpsController {
    async execute(request: Request, response: Response){
        const { survey_id } = request.params;

        const surveysUsersReposity = getCustomRepository(SurveysUsersRepository);

        const surveyUsers = await surveysUsersReposity.find({
            survey_id,
            value: Not(IsNull())
        })
        
        const detractor = surveyUsers.filter(survey =>
            (survey.value >= 0 && survey.value <= 6)
        ).length;

        const promoters = surveyUsers.filter(survey =>
            survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveyUsers.filter(survey =>
            survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswer = surveyUsers.length;

        const calculate = Number(
            (((promoters - detractor) / totalAnswer) * 100).toFixed(2)
        );

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswer,
            nps: calculate
        })
    }
}

export { NpsController };