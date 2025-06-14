import { CreateLead } from "../../usecase/lead/CreateLead";
import { DeleteLead } from "../../usecase/lead/DeleteLead";
import { ExportLead } from "../../usecase/lead/ExportLead";
import { FindLead } from "../../usecase/lead/FindLead";
import { ListLeadsByEvent } from "../../usecase/lead/ListLeadsByEvent";
import { ListLeadsByPartner } from "../../usecase/lead/ListLeadsByPartner";
import { UpdateLead } from "../../usecase/lead/UpdateLead";
import { ILeadExporter } from "../exporters/ILeadExporter";
import { EventRepositoryPrisma } from "../repositories/event/EventRepositoryPrisma";
import { LeadRepositoryPrisma } from "../repositories/lead/LeadRepositoryPrisma";
import { PartnerRepositoryPrisma } from "../repositories/partner/PartnerRepositoryPrisma";

export function makeLeadUseCases(
  leadRepository: LeadRepositoryPrisma,
  eventRepository: EventRepositoryPrisma,
  partnerRepository: PartnerRepositoryPrisma,
  exporter: ILeadExporter
) {
  return {
    create: CreateLead.create(leadRepository, eventRepository),
    findOne: FindLead.create(leadRepository, partnerRepository),
    exportLead: ExportLead.create(leadRepository, eventRepository, exporter),
    listByPartner: ListLeadsByPartner.create(leadRepository, partnerRepository),
    listByEvent: ListLeadsByEvent.create(leadRepository, eventRepository),
    delete: DeleteLead.create(leadRepository, partnerRepository),
    update: UpdateLead.create(leadRepository, partnerRepository),
  };
}
