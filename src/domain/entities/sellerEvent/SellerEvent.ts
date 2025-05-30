import { generateId } from "../../../shared/utils/IdGenerator";
import { SellerProps } from "../seller/Seller";

export type SellerEventProps = {
  id: string;
  sellerId: string;
  eventId: string;
  seller?: SellerProps;
};

export class SellerEvent {
  private constructor(private readonly props: SellerEventProps) {}

  public static create(sellerId: string, eventId: string) {
    if (!sellerId.trim()) {
      throw new Error("Seller ID is required.");
    }

    if (!eventId.trim()) {
      throw new Error("Event ID is required.");
    }

    return new SellerEvent({
      id: generateId(),
      sellerId,
      eventId,
    });
  }

  public static with(props: SellerEventProps) {
    return new SellerEvent(props);
  }

  public get id() {
    return this.props.id;
  }

  public get sellerId() {
    return this.props.sellerId;
  }

  public get eventId() {
    return this.props.eventId;
  }

  public get seller() {
    return this.props.seller;
  }
}
