/**
 * 公司
 *
 * @author cool1024
 * @file   company.interface.ts
 * @date   2019-1-4 10:26:43
 */
export interface Company {
    id: number;
    isActive: number;
    companyName: string;
    comapnyLogo: string;
    companyServiceTotal: number;
    companyServiceActiveTotal: number;
    createdAt: string;
}

export interface CompanyModel {
    id: number;
    appName: string;
    appThumb: string;
    isActive: number;
}



