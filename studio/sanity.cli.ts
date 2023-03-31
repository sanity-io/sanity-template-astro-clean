import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './sanity.config'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
