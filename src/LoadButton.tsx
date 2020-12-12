export const LoadButton = ({
  setLoadedImage,
}: {
  setLoadedImage: (image: HTMLImageElement) => void;
}) => {
  return (
    <input
      onChange={async (event) => {
        const imagePromise = new Promise<HTMLImageElement>(
          (resolve, reject) => {
            const imageUrl = URL.createObjectURL(event.target.files![0]);
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => resolve(image);
          }
        );
        const image = await imagePromise;

        setLoadedImage(image);
      }}
      type="file"
    />
  );
};
