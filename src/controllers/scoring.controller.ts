import { Request, Response } from "express";
import { EmploymentDTO } from "../dto/employment.dto";
import { ScoringDataDTO } from "../dto/scoringData.dto";
import { ScoringService } from "../services/scoring.service";

const getScoringResult = async (req: Request, res: Response) => {
  try {
    const scoringResult = new ScoringService(
      new ScoringDataDTO(
        Number(req.body.amount),
        Number(req.body.term),
        req.body.firstName,
        req.body.lastName,
        req.body.middleName,
        req.body.gender,
        new Date(req.body.birthdate),
        req.body.passportNumber,
        req.body.passportNumber,
        new Date(req.body.passportIssueDate),
        req.body.passportIssueBranch,
        req.body.maritalStatus,
        Number(req.body.dependAmount),
        new EmploymentDTO(
          req.body.employment.employmentStatus,
          req.body.employment.employerINN,
          Number(req.body.employment.salary),
          req.body.employment.position,
          Number(req.body.employment.getWorkExperienceTotal),
          Number(req.body.employment.getWorkExperienceCurrent)
        ),
        req.body.account,
        req.body.isInsuranceEnabled,
        req.body.isSalaryClient
      )
    );
    res.status(200).send(JSON.stringify(scoringResult.getCredit(), null, 3));
    //res.status(200).send(JSON.stringify(req.body));
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};
export { getScoringResult };
