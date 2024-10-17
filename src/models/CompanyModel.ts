import connection from "@/database/connection";
import { BaseModel } from "./BaseModel";
import { Company } from "@/types/company";
import { deleteFile } from "@/utils/file";

export class CompanyModel extends BaseModel<Company> {
  constructor() {
    super("companies");
  }

  async updateCompanyAndDeletePrevImage(id: number, data: Partial<Company>) {
    const transaction = await connection.transaction();
  
    try {
      // Fetch the current company to get the existing image URL
      const [existingCompany] = await transaction('companies')
        .where({ id })
        .select('image');
  
      // Update the company with the new data
      const [updatedCompany] = await transaction('companies')
        .where({ id })
        .update(data)
        .returning('*');
  
      // Commit the transaction before performing the image deletion
      await transaction.commit();
  
      // If the company had an old image and a new image is being uploaded, delete the old image
      if (existingCompany.image && data.image && existingCompany.image !== data.image) {
        const path = process.cwd() + '/public/' + existingCompany.image;
        await deleteFile(path);
      }
  
      return updatedCompany || undefined;
  
    } catch (error) {
      // Rollback the transaction if something goes wrong
      await transaction.rollback();
      console.error('Error updating company and deleting previous image:', error);
      throw error;
    }
  }

  async deleteCompanyAndImage(id: number) {
    const transaction = await connection.transaction();

    try{

      const [existingCompany] = await transaction('companies')
      .where({ id })
      .select('image');

      const result = await connection('companies').where({ id }).del();

      await transaction.commit();

      if(existingCompany.image){
        const path = process.cwd() + '/public/' + existingCompany.image;
        await deleteFile(path);
      }

      return result;

    } catch (error) {
      console.error("Error deleting company and image:", error);
      throw error;
    }
  }
}
