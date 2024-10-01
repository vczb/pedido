import { selectCompanyModel } from "@/models/companies";
import {
  insertProductModel,
  deleteProductModel,
  updateProductModel,
  selectProductByIdAndUserTokenModel,
  selectProductModel,
  selectJoinProductsModel,
  selectProductsModel,
} from "@/models/products";
import { Product } from "@/types/product";
import { verifySessionToken } from "@/utils/criptography";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
  unprocessableEntity,
} from "@/utils/http-helpers";
import { getCookie } from "@/utils/storage/server";

export const fetchProductByIdAndUserToken = async ({
  token,
  productId,
}: {
  token: string;
  productId: string;
}) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: string };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }


    const company = await selectCompanyModel({id: userId as unknown as number})

    if (!company?.id) {
      return unauthorized(
        "Não foi possível fazer a relação entre os dados"
      );
    }

    const product = await selectProductByIdAndUserTokenModel({
      company_id: company.id,
      id: productId,
    });

    if (!product) {
      return unprocessableEntity("Produto não encontrado para este usuário.");
    }

    const data = {
      product,
    };

    return ok("Dados do produto carregados com sucesso!", data);
  } catch (error) {
    return unprocessableEntity("Ocorreu um erro ao buscar os produtos.");
  }
};

export const fetchAllProductsByUserToken = async (token: string) => {
  try {
    const { id: userId } = verifySessionToken(token) as { id?: string };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const products = await selectJoinProductsModel({ userId });

    const data = {
      products,
    };

    return ok("Dados dos produtos carregados com sucesso!", data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return unprocessableEntity("Ocorreu um erro ao buscar o produto.");
  }
};

// TODO: Refactor to query by CompanyId instead of userId
export const fetchAllProductsByCompanyId = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    if (!userId) {
      return badRequest("Não foi possível verificar o ID da empresa");
    }


    const company = await selectCompanyModel({id: userId as unknown as number})

    if (!company?.id) {
      return unauthorized(
        "Não foi possível fazer a relação entre os dados"
      );
    }

    const products = await selectProductsModel({  company_id: company.id   });

    const data = {
      products,
    };

    return ok("Dados dos produtos carregados com sucesso!", data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return unprocessableEntity("Ocorreu um erro ao buscar o produto.");
  }
};

export const modifyProduct = async (productData: Partial<Product>) => {
  try {
    const token = getCookie("token");

    if (!token?.value) {
      return serverError(
        "Não foi possível checar a autenticidade da requisição"
      );
    }
    const { id: userId } = verifySessionToken(token.value) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    if (!productData.id) {
      return badRequest("Erro no corpo da requisição");
    }


    const company = await selectCompanyModel({id: userId as unknown as number})

    if (!company?.id) {
      return unauthorized(
        "Não foi possível fazer a relação entre os dados"
      );
    }

    const updatedProduct = await updateProductModel(
      productData
    );

    if (!updatedProduct) {
      return unprocessableEntity("Não foi possível atualizar o produto.");
    }

    const data = {
      product: updatedProduct,
    };

    return ok("Produto atualizado com sucesso!", data);
  } catch (error) {
    console.error("Error updating product:", error);
    return unprocessableEntity("Ocorreu um erro ao atualizar o produto.");
  }
};

export const createProduct = async (productData: Partial<Product>) => {
  try {
    const token = getCookie("token");

    if (!token?.value) {
      return serverError(
        "Não foi possível checar a autenticidade da requisição"
      );
    }
    const { id: userId } = verifySessionToken(token.value) as { id?: number };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const company = await selectCompanyModel({id: userId as unknown as number})

    if (!company?.id) {
      return unauthorized(
        "Não foi possível fazer a relação entre os dados"
      );
    }

    const payload = {
      ...productData,
      company_id: company.id,
    } as Product;

    const newProduct = await insertProductModel(payload);

    if (!newProduct) {
      return unprocessableEntity("Não foi possível criar o produto.");
    }

    const data = {
      product: newProduct,
    };

    return ok("Produto criado com sucesso!", data);
  } catch (error) {
    console.error("Error creating product:", error);
    return unprocessableEntity("Ocorreu um erro ao criar o produto.");
  }
};

export const removeProduct = async (productId: string) => {
  try {
    const token = getCookie("token");

    if (!token?.value) {
      return serverError(
        "Não foi possível checar a autenticidade da requisição"
      );
    }
    const { id: userId } = verifySessionToken(token.value) as { id?: string };

    if (!userId) {
      return unauthorized(
        "Não foi possível verificar a autenticidade do usuário"
      );
    }

    const existingProduct = await selectJoinProductsModel({
      id: parseInt(productId),
      userId,
    });

    if (!existingProduct) {
      return unprocessableEntity("Produto não encontrado para este usuário.");
    }

    const deletedProduct = await deleteProductModel({
      id: parseInt(productId),
    });

    if (!deletedProduct) {
      return unprocessableEntity("Não foi possível deletar o produto.");
    }

    return ok("Produto deletado com sucesso!");
  } catch (error) {
    console.error("Error deleting product:", error);
    return unprocessableEntity("Ocorreu um erro ao deletar o produto.");
  }
};
