// libs
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { toast } from 'react-toastify';

export interface PhotoFieldProps {
  name: string;
  control: Control<any>;
  setValue?: any;
}

const PhotoField = ({ name, control, setValue }: PhotoFieldProps) => {
  const {
    field: { ref },
  } = useController({
    name,
    control,
  });

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files.length > 0 ? e.target.files[0] : null;
    if (!selectedFile) return;

    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(selectedFile.type)) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        setValue(name, { file: selectedFile, base64: reader.result as string });
      });
      reader.readAsDataURL(selectedFile);
    } else {
      toast.error('Invalid File');
    }
  };

  return (
    <Box my={1}>
      <label htmlFor="contained-button-file">
        <input
          hidden
          type="file"
          accept="image/*"
          ref={ref}
          name={name}
          id="contained-button-file"
          onChange={handleFileChange}
          multiple
        />
        <Button variant="contained" component="span">
          <PhotoCamera /> &nbsp; Upload
        </Button>
      </label>
    </Box>
  );
};

export default PhotoField;
