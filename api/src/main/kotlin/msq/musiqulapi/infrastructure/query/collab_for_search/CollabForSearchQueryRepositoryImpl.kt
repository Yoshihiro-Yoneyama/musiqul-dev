package msq.musiqulapi.infrastructure.query.collab_for_search

import msq.musiqulapi.application.query.colab.collab_for_search.CollabForSearchQueryRepository
import msq.musiqulapi.application.query.colab.collab_for_search.Recruitment
import org.springframework.stereotype.Repository

@Repository
class CollabForSearchQueryRepositoryImpl : CollabForSearchQueryRepository {
  override fun saveRecruitment(recruitment: Recruitment) {
    println("********Repository********")
  }
}
