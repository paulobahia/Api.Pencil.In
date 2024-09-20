import { Controller, Get, HttpStatus, Param, Res, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ResponseDescription } from "src/common/constants/response-description.enum";
import { GetEmployeeByUserIdRequestParam } from "../dtos/get-employee-by-user-id-request-param.dto";
import { FindEmployeeByUserIdQuery } from "../queries/implements/find-employee-by-userId.query";
import { Response } from "express";

@ApiTags('Employee')
@Controller('api/employee')
export class EmployeeController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) { }

  @Get(':userId')
  @ApiResponse({ status: HttpStatus.OK, description: ResponseDescription.OK })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiInternalServerErrorResponse({ description: ResponseDescription.INTERNAL_SERVER_ERROR, })
  async getEmployee(@Param() { userId }: GetEmployeeByUserIdRequestParam, @Res() res: Response) {
    const query = new FindEmployeeByUserIdQuery(userId);
    const employee = await this.queryBus.execute(query);

    if (!employee) {
      return res.redirect('https://pencilin.com.br/first-steps')
    }

    return res.redirect('https://pencilin.com.br/my-studio')
  }
}