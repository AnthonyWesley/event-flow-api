import { Request, Response } from "express";
import { HttpMethod, IRoute } from "../IRoute";
import { Authorization } from "../../../infra/http/middlewares/Authorization";
import {
  ApproveOrRejectPendingAction,
  ApproveOrRejectPendingActionInputDto,
} from "../../../usecase/pendingAction/ApproveOrRejectPendingAction ";

export class ApproveOrRejectPendingActionRoute implements IRoute {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly approveOrRejectPendingActionService: ApproveOrRejectPendingAction,
    private readonly authorization: Authorization
  ) {}

  public static create(
    approveOrRejectPendingActionService: ApproveOrRejectPendingAction,
    authorization: Authorization
  ) {
    return new ApproveOrRejectPendingActionRoute(
      "/pending-action/approve-reject",
      HttpMethod.POST,
      approveOrRejectPendingActionService,
      authorization
    );
  }

  getHandler() {
    return async (req: Request, res: Response) => {
      const { partner } = req as any;
      const { pendingActionId, approve } = req.body;

      const input: ApproveOrRejectPendingActionInputDto = {
        pendingActionId,
        approve,
      };

      const result = await this.approveOrRejectPendingActionService.execute(
        input
      );
      res.status(201).json(result);
    };
  }

  getPath(): string {
    return this.path;
  }

  getMethod(): HttpMethod {
    return this.method;
  }

  getMiddlewares() {
    return this.authorization.authorizationRoute;
  }
}
