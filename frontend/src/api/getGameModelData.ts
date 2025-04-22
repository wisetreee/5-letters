import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { sendRequest } from "./sendRequest";
import { GameModelData } from "@/lib/types";

export const getGameModelData = async (
  userId: string,
  onError: (error: string) => void,
  setLoading: (loading: boolean) => void,
) => {
  try {
    setLoading(true);
    const response = await sendRequest<void, GameModelData>(
      `/api/model/${userId}`,
      "get",
    );

    if (!response.succeeded || !response.data) {
      onError(response.err || "No data");
      return null;
    }
    return response.data;
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(
      error,
      "Неизвестная ошибка при запросе данных об игре",
    );
    onError(errorMessage);
    return null;
  } finally {
    setLoading(false);
  }
};
