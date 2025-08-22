interface clashErrors {
  title?: string[];
  description?: string[];
  expire_at?: string[];
  banner?: string[];
}

interface ClashInterface {
  banner: {
    image_url: string;
  };
  banner_id: string;
  created_at: string;
  description: string;
  expire_at: string;
  id: string;
  title: string;
  user_id: string;
}

interface ClashItemsForm {
  image: File | null;
}
