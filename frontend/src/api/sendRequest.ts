
export interface ApiResponse<T> {
  err?: string;
  succeeded: boolean;
  data?: T;
}

export async function sendRequest<Resp, Inp>(
  path: string,
  method: 'get' | 'post' = 'post',
  params?: Inp
): Promise<ApiResponse<Resp>> {
  try {
    let fetchResponse: Response; 
    if (method === 'get') {
      fetchResponse = await fetch(path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      fetchResponse = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    }

    // Проверяем, что ответ успешный
    if (!fetchResponse.ok) {
      throw new Error(`Ошибка HTTP: ${fetchResponse.status}`);
    }

    // Парсим JSON-ответ
    const data: Resp = await fetchResponse.json();

    return {
      succeeded: true,
      data,
    };
  } catch (error: any) {
    return {
      err: error.message,
      succeeded: false,
    };
  }
}