import type { MasterScreenLifestyle } from "../data/masterScreenLifestyles";
import type { MasterScreenLifestyleRepository } from "../repositories/masterScreenLifestyleRepository";

export class MasterScreenLifestyleService {
  private readonly masterScreenLifestyleRepository: MasterScreenLifestyleRepository;

  constructor(masterScreenLifestyleRepository: MasterScreenLifestyleRepository) {
    this.masterScreenLifestyleRepository = masterScreenLifestyleRepository;
  }

  async getLifestyles(): Promise<MasterScreenLifestyle[]> {
    await this.masterScreenLifestyleRepository.ensureSeedData();

    return this.masterScreenLifestyleRepository.findAll();
  }
}
