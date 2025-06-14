import { CreatePartner } from "../../usecase/partner/CreatePartner";
import { DeletePartner } from "../../usecase/partner/DeletePartner";
import { FindPartner } from "../../usecase/partner/FindPartner";
import { ListPartner } from "../../usecase/partner/ListPartner";
import { LoginPartner } from "../../usecase/partner/LoginPartner";
import { LogoutPartner } from "../../usecase/partner/LogoutPartner";
import { RefreshPartner } from "../../usecase/partner/RefreshPartner";
import { UpdatePartner } from "../../usecase/partner/UpdatePartner";
import { Authorization } from "../http/middlewares/Authorization";
import { PartnerRepositoryPrisma } from "../repositories/partner/PartnerRepositoryPrisma";

export function makePartnerUseCases(
  partnerRepository: PartnerRepositoryPrisma,
  authorization: Authorization
) {
  return {
    login: LoginPartner.create(partnerRepository, authorization),
    logout: LogoutPartner.create(partnerRepository, authorization),
    refresh: RefreshPartner.create(partnerRepository, authorization),
    create: CreatePartner.create(partnerRepository),
    findOne: FindPartner.create(partnerRepository),
    list: ListPartner.create(partnerRepository),
    delete: DeletePartner.create(partnerRepository),
    update: UpdatePartner.create(partnerRepository),
  };
}
