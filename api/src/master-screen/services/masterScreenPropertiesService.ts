import type {
  MasterScreenPropertiesData,
  MasterScreenPropertiesRepository,
} from "../repositories/masterScreenPropertiesRepository";

export class MasterScreenPropertiesService {
  private readonly masterScreenPropertiesRepository: MasterScreenPropertiesRepository;

  constructor(masterScreenPropertiesRepository: MasterScreenPropertiesRepository) {
    this.masterScreenPropertiesRepository = masterScreenPropertiesRepository;
  }

  async getPropertiesData(): Promise<MasterScreenPropertiesData> {
    await this.masterScreenPropertiesRepository.ensureSeedData();

    return this.masterScreenPropertiesRepository.findPropertiesData();
  }
}
