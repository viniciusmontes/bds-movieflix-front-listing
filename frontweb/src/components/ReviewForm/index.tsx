import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';

import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Review } from 'util/review';
import { toast } from 'react-toastify';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);
    console.log(formData);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: './reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then((response) => {
        setValue('text', '');
        onInsertReview(response.data);
        toast.success("Avaliação cadastrada com sucesso")
      })
      .catch((error) => {
        toast.error('Erro ao salvar avaliação')
      });
  };

  return (
    <div className="base-card form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register('text')}
            type="text"
            placeholder="Deixe sua avaliação aqui"
            name="text"
            className="form-control base-input"
          />
          <div className="review-form-button">
            <ButtonIcon text="SALVAR AVALIAÇÃO" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
