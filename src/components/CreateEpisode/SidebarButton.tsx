import { useMutation } from '@apollo/client';
import { CREATE_EPISODE } from '../../utils/graphql/mutations';
import { EpisodeInput } from '../../utils/graphql/types';
import { useForm } from 'react-hook-form';
import styles from './sidebarbutton.module.scss';

const SidebarButton = ({onClickButton}) => {
    const [createEpisode, { loading, error }] = useMutation(CREATE_EPISODE, {
      update(cache, { data: { createEpisode } }) {
        // Update the cache after mutation
        cache.modify({
          fields: {
            listEpisodes(existingEpisodes = []) {
              return [...existingEpisodes, createEpisode];
            },
          },
        });
      },
    });
  
    const { register, handleSubmit, reset } = useForm<EpisodeInput>();
  
    const onSubmit = async (formData: EpisodeInput) => {
      try {
        await createEpisode({
          variables: { episode: formData },
        });
        reset();
      } catch (err) {
        console.error('Error creating episode:', err);
      }
    };
  
    return (
      <div className={styles.card} onClick={onClickButton}>
        <span>+</span>
      </div>
    );
  };

export default SidebarButton;