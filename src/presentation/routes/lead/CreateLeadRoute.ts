import { Request, Response } from "express";
import { Authorization } from "../../../infra/http/middlewares/Authorization";
import { HttpMethod, IRoute } from "../IRoute";
import {
  CreateLead,
  CreateLeadInputDto,
} from "../../../usecase/lead/CreateLead";

export type CreateLeadRouteResponseDto = {
  id: string;
};

export class CreateLeadRoute implements IRoute {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createLeadRouteService: CreateLead,
    private readonly authorization: Authorization
  ) {}

  public static create(
    createLeadRouteService: CreateLead,
    authorization: Authorization
  ) {
    return new CreateLeadRoute(
      "/events/:eventId/leads",
      HttpMethod.POST,
      createLeadRouteService,
      authorization
    );
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const { partner } = request as any;
      const { eventId } = request.params;
      const { name, email, phone, products, customInterest, notes, source } =
        request.body;

      const input: CreateLeadInputDto = {
        name,
        email,
        phone,
        products,
        customInterest,
        notes,
        source,
        eventId,
        partnerId: partner.id,
      };

      const output: CreateLeadRouteResponseDto =
        await this.createLeadRouteService.execute(input);
      const result = { id: output.id };

      response.status(201).json(result);
    };
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getMiddlewares() {
    return this.authorization.authorizationRoute;
  }
}
