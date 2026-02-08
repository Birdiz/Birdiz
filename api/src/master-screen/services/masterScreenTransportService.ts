import type {
  MasterScreenTransportData,
  MasterScreenTransportRepository,
} from "../repositories/masterScreenTransportRepository";

export class MasterScreenTransportService {
  private readonly masterScreenTransportRepository: MasterScreenTransportRepository;

  constructor(masterScreenTransportRepository: MasterScreenTransportRepository) {
    this.masterScreenTransportRepository = masterScreenTransportRepository;
  }

  async getTransportData(): Promise<MasterScreenTransportData> {
    await this.masterScreenTransportRepository.ensureSeedData();

    return this.masterScreenTransportRepository.findTransportData();
  }
}
