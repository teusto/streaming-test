import { gql } from '@apollo/client';

export const ON_CREATE_EPISODE = gql`
  subscription OnCreateEpisode {
    onCreateEpisode {
      id
      title
    }
  }
`;

export const ON_UPDATE_EPISODE = gql`
  subscription OnUpdateEpisode {
    onUpdateEpisode {
      id
      title
    }
  }
`;

export const ON_DELETE_EPISODE = gql`
  subscription OnDeleteEpisode {
    onDeleteEpisode {
      id
    }
  }
`;