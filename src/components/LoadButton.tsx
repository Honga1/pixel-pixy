export const LoadButton = ({
  setLoadedImage,
}: {
  setLoadedImage: (image: HTMLImageElement) => void;
}) => {
  return (
    <label>
      Upload Image
      <input
        onChange={async (event) => {
          const imagePromise = new Promise<HTMLImageElement>(
            (resolve, reject) => {
              if (!event.target.files || !event.target.files[0]) return;
              const imageUrl = URL.createObjectURL(event.target.files![0]);
              const image = new Image();
              image.src = imageUrl;
              image.onload = () => resolve(image);
            }
          );
          const image = await imagePromise;
          event.target.value = "";
          setLoadedImage(image);
        }}
        type="file"
        accept="image/*"
      />
    </label>
  );
};
