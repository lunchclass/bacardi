# SimRank

SimRank is a measure of similarity between nodes in a directed graph, based on the idea that "two objects are similar if they are related to similar objects." This implementation is optimized to run in *O*(*n*³), an improvement on the original paper’s *O*(*n*⁴). It also takes weighted edges into account, an improvement taken from SimRank++.

I originally wrote it to find similarities between users on [Metafilter](https://www.metafilter.com/) based on favorites data taken from the [Infodump](http://stuff.metafilter.com/infodump/).

The example demonstrates correct output for the Figure 1 graph in \[1\].


## References

[\[1\]](http://www-cs-students.stanford.edu/~glenj/simrank.pdf) G. Jeh and J. Widom. “SimRank: A Measure of Structural-Context Similarity.” In KDD ’02: Proceedings of the eighth ACM SIGKDD international conference on Knowledge discovery and data mining, pages 538−543. ACM Press, 2002.

[\[2\]](http://modis.ispras.ru/Lizorkin/Publications/simrank_accuracy.pdf) D. Lizorkin, P. Velikhov, M. Grinev and D. Turdakov. “Accuracy Estimate and Optimization Techniques for SimRank Computation.” In VLDB ’08: Proceedings of the 34th International Conference on Very Large Data Bases, pages 422−433.

[\[3\]](http://ilpubs.stanford.edu:8090/870/1/2008-17.pdf) I. Antonellis, H. Garcia-Molina and C.-C. Chang. “Simrank++: Query Rewriting through Link Analysis of the Click Graph.” In VLDB ’08: Proceedings of the 34th International Conference on Very Large Data Bases, pages 408−421.