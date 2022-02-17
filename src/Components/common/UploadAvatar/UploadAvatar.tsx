import defaultImg from 'assets/images/upload_image.svg';
import { UniversalModal } from 'Components/common/UniversalModal/UniversalModal';
import { convertImageBlobToBase64 } from 'helpers';
import { useFormInModal } from 'hooks';
import React, {
  RefObject, useCallback,
  useEffect, useRef, useState
} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from '../form';
import './upload-avatar-styles.scss';


interface IUploadAvatar {
  value: string;
  name: string;
  onChange: (image: string) => void;
  handlerBlur?: (name: string) => void;
}

const pixelRatio = window.devicePixelRatio || 1;

function getResizedCanvas(
  canvas: HTMLCanvasElement,
  newWidth: number,
  newHeight: number,
) {
  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext('2d');
  ctx?.drawImage(
    canvas,
    0,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    newWidth,
    newHeight,
  );

  return tmpCanvas;
}

function generateBlob(previewCanvas: any, crop: HTMLCanvasElement) {
  if (!crop || !previewCanvas) {
    return;
  }
  const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob: any) => {
      if (!blob) {
        console.error('Canvas is empty');
        return;
      }
      blob.filename = 'newFile.png';
      blob.name = 'newFile.png';

      resolve(blob);
    }, 'image/png');
  });
}

const toBase64 = async (
  previewCanvasRef: RefObject<HTMLCanvasElement>,
  completedCrop: HTMLCanvasElement,
) => {
  const blob = await generateBlob(previewCanvasRef.current, completedCrop);
  if (blob) {
    const base64 = await convertImageBlobToBase64(blob);
    return base64;
  }
};

export const UploadAvatar = (props: IUploadAvatar) => {
  const [upImg, setUpImg] = useState<any>();
  const [imgRef, setImageRef] = useState<any>('');
  const previewCanvasRef = useRef<any>(null);
  const [crop, setCrop] = useState<any>({
    aspect: 6 / 6,
    unit: 'px',
    width: 90,
    height: 90,
    x: 5,
    y: 10,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const { onChange, value, handlerBlur, name } = props;

  const [isLarge,setIsLarge] = useState<boolean>(false);

  const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));


  const onSelectFile = async (e: any) => {
    let {size = 1000937} = e.target.files[0];
    let fileSize = 0.5;
    if(size){
      fileSize = size/(1024*1024);
    }else{
      size = 1000937;
      fileSize = size/(1024*1024);
    }

    if (e.target.files && e.target.files.length > 0 && fileSize <= 1.0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      openEditor()();
    }else{
      setIsLarge(true);
      await wait(3000);
      setIsLarge(false);
    }
  };



  const btnHandler = async () => {
    const result = await toBase64(previewCanvasRef, completedCrop);
    if (result) {
      onChange(result);
    }
    closeEditor();
  };

  const onLoad = useCallback((img) => {
    setImageRef(img);
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef) {
      return;
    }

    const image = imgRef;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image?.naturalWidth / image.width;
    const scaleY = image?.naturalHeight / image.height;
    const ctx = canvas?.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
  }, [completedCrop]);

  const { promptTitle, isPrompt, closeEditor, openEditor } = useFormInModal(
    [],
    'crop',
  );

  return (
    <div className="image-upload-wrapper">
      <div className={`image-upload-btn ${!value && 'border'}`}>
        <label htmlFor="file">
          <img
            src={value || defaultImg}
            alt={`${value ? 'Avatar' : 'Upload Image'}`}
            className={`${value && 'uploaded-image'}`}
          />
          {value && (
            <div className="upload-icon">
              <img src={defaultImg} alt="Upload" />
            </div>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          onBlur={handlerBlur ? () => handlerBlur(name) : undefined}
          className="input-file"
          id="file"
        />
      </div>
      <div className="upload-label">
        <label className="input-label">Upload avatar</label>
        <span className="add-info">max. file size 1 Mb</span>
        {isLarge && <span className="add-info max-size-validation">max. file size exceded please try again.</span>}
      </div>
      <UniversalModal
        visible={isPrompt}
        title={promptTitle}
        onCancel={closeEditor}
        className="category-editor-modal"
      >
        <div className="react-cropper-wrapper">
          <ReactCrop
            circularCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <div className="react-cropper-save-btn">
            <Button onClick={btnHandler}>Save</Button>
          </div>
        </div>
      </UniversalModal>
      <div style={{ opacity: 0, position: 'absolute', zIndex: -1 }}>
        <canvas
          className="canvas"
          ref={previewCanvasRef}
          style={{
            width: 90,
            height: 90,
            maxWidth: 90,
            maxHeight: 90,
          }}
        />
      </div>
    </div>
  );
};
