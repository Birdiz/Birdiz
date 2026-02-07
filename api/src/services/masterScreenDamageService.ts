import type {
  MasterScreenDamageDocument,
  MasterScreenDamageRepository,
} from "../repositories/masterScreenDamageRepository";

export class MasterScreenDamageService {
  private readonly masterScreenDamageRepository: MasterScreenDamageRepository;

  constructor(masterScreenDamageRepository: MasterScreenDamageRepository) {
    this.masterScreenDamageRepository = masterScreenDamageRepository;
  }

  async getDamages(): Promise<MasterScreenDamageDocument[]> {
    await this.masterScreenDamageRepository.ensureSeedData();

    return this.masterScreenDamageRepository.findAll();
  }
}
