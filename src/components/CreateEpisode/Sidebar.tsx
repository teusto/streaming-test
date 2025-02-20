import { useMutation } from '@apollo/client';
import { CREATE_EPISODE } from '../../utils/graphql/mutations';
import { EpisodeInput } from '../../utils/graphql/types';
import { useForm } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './sidebar.module.scss';

interface CreateEpisodeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: CreateEpisodeSidebarProps) => {
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
  const sidebarRef = useRef<HTMLDivElement>(null);

  // GSAP animation for sidebar
  useEffect(() => {
    if (sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        right: isOpen ? 0 : -400,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isOpen]);

  const onSubmit = async (formData: EpisodeInput) => {
    try {
      await createEpisode({
        variables: { episode: {...formData, id: formData.imdbId} },
      });
      reset(); // Reset form after successful submission
      onClose(); // Close the sidebar
    } catch (err) {
      console.error('Error creating episode:', err);
    }
  };

  return (
    <div ref={sidebarRef} className={styles.sidebar}>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
      <h2>Create New Episode</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register('series', { required: true })}
          placeholder="Series"
          className={styles.input}
        />
        <input
          {...register('title', { required: true })}
          placeholder="Title"
          className={styles.input}
        />
        <textarea
          {...register('description', { required: true })}
          placeholder="Description"
          className={styles.textarea}
        />
        <div className={styles.grid}>
          <input
            {...register('seasonNumber', { required: true, valueAsNumber: true })}
            placeholder="Season"
            type="number"
            className={styles.input}
          />
          <input
            {...register('episodeNumber', { required: true, valueAsNumber: true })}
            placeholder="Episode"
            type="number"
            className={styles.input}
          />
        </div>
        <input
          {...register('releaseDate', { required: true })}
          type="date"
          className={styles.input}
        />
        <input
          {...register('imdbId', { required: true })}
          placeholder="IMDB ID"
          className={styles.input}
        />

        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Creating...' : 'Create Episode'}
        </button>

        {error && (
          <div className={styles.error}>
            Error: {error.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Sidebar;