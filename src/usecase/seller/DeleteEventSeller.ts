import { IEventGateway } from "../../domain/entities/event/IEventGateway";
import { IPartnerGateway } from "../../domain/entities/partner/IPartnerGateway";
import { ISellerGateway } from "../../domain/entities/seller/ISellerGateway";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { IUseCases } from "../IUseCases";

export type DeleteEventSellerInputDto = {
  partnerId: string;
  sellerId: string;
};

export class DeleteEventSeller
  implements IUseCases<DeleteEventSellerInputDto, void>
{
  private constructor(
    private readonly sellerGateway: ISellerGateway,
    private readonly partnerGateway: IPartnerGateway
  ) {}

  static create(
    sellerGateway: ISellerGateway,
    partnerGateway: IPartnerGateway
  ) {
    return new DeleteEventSeller(sellerGateway, partnerGateway);
  }

  async execute(input: DeleteEventSellerInputDto): Promise<void> {
    const partnerExists = await this.partnerGateway.findById(input.partnerId);

    if (!partnerExists) {
      throw new NotFoundError("Partner not found.");
    }

    await this.sellerGateway.delete(input);
  }
}
