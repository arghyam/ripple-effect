package org.arghyam.puddle.data.paging

import androidx.paging.PagingSource
import androidx.paging.PagingState
import org.arghyam.puddle.domain.models.Recipe
import org.arghyam.puddle.domain.repository.WaterFtCalcRepository
import org.arghyam.puddle.domain.models.Result

class WFCPagingSource(
    private val wfcRepository: WaterFtCalcRepository,
    private val query: String
) : PagingSource<Int, Recipe>() {

    override suspend fun load(params: LoadParams<Int>): LoadResult<Int, Recipe> {
        return try {
            val page = params.key ?: 1
            val pageSize = params.loadSize
            when (val result = wfcRepository.getRecipes(pageSize, page, query)) {
                is Result.Success -> {
                    val recipes = result.data
                    LoadResult.Page(
                        data = recipes,
                        prevKey = if (page == 1) null else page - 1,
                        nextKey = if (recipes.isEmpty()) null else page + 1
                    )
                }
                is Result.Error -> {
                    LoadResult.Error(Throwable("${result.error}"))
                }
            }


        } catch (e: Exception) {
            LoadResult.Error(e)
        }
    }

    override fun getRefreshKey(state: PagingState<Int, Recipe>): Int? {
        return state.anchorPosition?.let { anchorPosition ->
            state.closestPageToPosition(anchorPosition)?.prevKey?.plus(1)
                ?: state.closestPageToPosition(anchorPosition)?.nextKey?.minus(1)
        }
    }
}
