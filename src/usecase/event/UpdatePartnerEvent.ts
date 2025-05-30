import { GoalType } from "@prisma/client";
import { Goal } from "../../domain/entities/event/Event";
import { IEventGateway } from "../../domain/entities/event/IEventGateway";
import { IPartnerGateway } from "../../domain/entities/partner/IPartnerGateway";
import { NotFoundError } from "../../shared/errors/NotFoundError";

export type UpdatePartnerEventInputDto = {
  partnerId: string;
  eventId: string;
  name?: string;
  isActive: boolean;
  startDate?: Date;
  endDate?: Date | null;
  goal?: number;
  goalType?: Goal;
};

export type UpdatePartnerEventResponseDto = {
  id: string;
  name: string;
  startDate: Date;
  isActive?: boolean;
  endDate: Date | null;
  goal: number;
  goalType: Goal;
  partnerId: string;
};

export class UpdatePartnerEvent {
  constructor(
    private readonly eventGateway: IEventGateway,
    private readonly partnerGateway: IPartnerGateway
  ) {}

  static create(eventGateway: IEventGateway, partnerGateway: IPartnerGateway) {
    return new UpdatePartnerEvent(eventGateway, partnerGateway);
  }

  async execute(
    input: UpdatePartnerEventInputDto
  ): Promise<UpdatePartnerEventResponseDto> {
    const partnerExists = await this.partnerGateway.findById(input.partnerId);
    if (!partnerExists) {
      throw new NotFoundError("Partner");
    }

    const existingEvent = await this.eventGateway.findById(input);
    if (!existingEvent) {
      throw new NotFoundError("Event");
    }

    const updatedEvent = await this.eventGateway.update(input);
    if (!updatedEvent) {
      throw new Error("Failed to update event.");
    }

    return {
      id: updatedEvent.id,
      name: updatedEvent.name,
      startDate: updatedEvent.startDate,
      endDate: updatedEvent.endDate ?? null,
      isActive: updatedEvent.isActive,
      goal: updatedEvent.goal,
      goalType: updatedEvent.goalType as GoalType,
      partnerId: updatedEvent.partnerId,
    };
  }
}
