#pragma once
#ifndef SIMRANK_HPP
#define SIMRANK_HPP

#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <cmath>
#include <algorithm>
#include <iterator>

template<typename T, typename I>
class Iterator_Wrapper {
private:
	const T &collection_;
public:
	inline Iterator_Wrapper(const T &collection) : collection_(collection) {}
	inline const I begin(void) const { return I(collection_.begin()); }
	inline const I end(void) const { return I(collection_.end()); }
	inline Iterator_Wrapper &operator=(const Iterator_Wrapper &) { return *this; }
};

template<typename T>
class Key_Iterator {
private:
	typename T::const_iterator pos_;
public:
	inline Key_Iterator(typename T::const_iterator pos) : pos_(pos) {}
	inline typename T::key_type operator*() { return pos_->first; }
	inline bool operator!=(const Key_Iterator &other) const { return pos_ != other.pos_; }
	inline const Key_Iterator &operator++() { ++pos_; return *this; }
};

template<typename T>
using Key_Iterator_Wrapper = Iterator_Wrapper<T, Key_Iterator<T>>;

template<typename T>
using Const_Iterator_Wrapper = Iterator_Wrapper<T, typename T::const_iterator>;

template<typename K, typename V>
using umap = std::unordered_map<K, V>;

template<typename T>
using uset = std::unordered_set<T>;

template<typename Node, typename Float = double>
class SimRank {
public:
	SimRank(size_t K = 6, Float C = 0.6, Float D = 0.05);

	// Reserve space in memory for at least n nodes
	void reserve(size_t n);
	// Add an edge to the graph
	void add_edge(Node head, Node tail, Float weight = 1);
	// Calculate SimRank scores after adding all the edges
	void calculate_simrank(void);
	// Return the similarity score between nodes a and b
	Float similarity(Node a, Node b) const;

	// Return the number of iterations
	inline size_t K(void) const { return K_; }
	// Return the decay factor
	inline Float C(void) const { return C_; }
	// Return the delta for threshold sieving
	inline Float D(void) const { return D_; }

	// Return the number of nodes in the graph
	inline size_t num_nodes(void) const { return node_properties_.size(); }
	// Return the number of nodes with out-degree > 0
	inline size_t num_heads(void) const { return edge_weights_.size(); }
	// Return the number of nodes with in-degree > 0
	inline size_t num_tails(void) const { return in_neighbors_.size(); }

	// Edge data accessible via edges()
	struct Edge {
		Node head, tail;
		Float weight;
		inline Edge(Node head, Node tail, Float weight) : head(head), tail(tail), weight(weight) {}
	};

private:
	struct Node_Props;
public:
	// Iterate over all nodes, e.g. "for (Node x : simrank.nodes()) { ... }"
	inline const Key_Iterator_Wrapper<umap<Node, Node_Props>> nodes(void) const {
		return Key_Iterator_Wrapper<umap<Node, Node_Props>>(node_properties_);
	}
	class edge_iterable;
	// Iterate over all edges, e.g. "for (SimRank::Edge e : simrank.edges()) { ... }"
	inline const edge_iterable edges(void) const { return edge_iterable(edge_weights_); }

	// Return the out-degree of node x (the sum of the outgoing edges' weights)
	inline Float out_degree(Node x) { return node_properties_[x].out_degree; }
	// Return the in-degree of node x (the sum of the incoming edges' weights)
	inline Float in_degree(Node x) { return node_properties_[x].in_degree; }

	// Iterate over the out-neighbors of node x, e.g. "for (Node y : simrank.out_neighbors(x)) { ... }"
	inline const Key_Iterator_Wrapper<umap<Node, Float>> out_neighbors(Node x) {
		return Key_Iterator_Wrapper<umap<Node, Float>>(edge_weights_[x]);
	}
	// Iterate over the in-neighbors of node x, e.g. "for (Node y : simrank.in_neighbors(x)) { ... }"
	inline const Const_Iterator_Wrapper<uset<Node>> in_neighbors(Node x) {
		return Const_Iterator_Wrapper<uset<Node>>(in_neighbors_[x]);
	}

	// Return the weight of the edge from a to b (normalized after calling calculate_simrank())
	inline Float edge_weight(Node a, Node b) { return edge_weights_[a][b]; }

private:
	struct Node_Props {
		umap<Node, Float> simrank;
		Float partial_sum;
		Float in_degree, out_degree;
		inline Node_Props(void) : simrank(), partial_sum(), in_degree(), out_degree() {}
	};

	size_t K_;
	Float C_;
	Float D_;

	std::vector<Float> delta_; // deltas for threshold sieving

	umap<Node, Node_Props>        node_properties_; // {node1 -> <{node2 -> SimRank}, etc>} (node1 <= node2)
	umap<Node, uset<Node>>        in_neighbors_;    // {node -> {in-neighbors}}
	umap<Node, umap<Node, Float>> edge_weights_;    // {head -> {tail -> weight}}

	std::vector<Node> temp_nodes_;      // temporary node storage for calculating essential paired nodes
	std::vector<Node> essential_nodes_; // essential paired nodes (reused in each update iteration)

	void normalize_edges(void);
	void update_simrank_scores(Node a, size_t k);

public:
	class edge_iterator {
		typedef typename umap<Node, umap<Node, Float>>::const_iterator pos_iterator;
		typedef typename umap<Node, Float>::const_iterator subpos_iterator;
	private:
		pos_iterator pos_, pos_end_;
		subpos_iterator subpos_, subpos_end_;
	public:
		inline edge_iterator(pos_iterator pos, subpos_iterator subpos, pos_iterator pos_end, subpos_iterator subpos_end) :
			pos_(pos), subpos_(subpos), pos_end_(pos_end), subpos_end_(subpos_end) {}
		inline Edge operator*() { return Edge(pos_->first, subpos_->first, subpos_->second); }
		inline bool operator!=(const edge_iterator &other) const { return pos_ != other.pos_ || subpos_ != other.subpos_; }
		inline const edge_iterator &operator++(void) {
			++subpos_;
			if (subpos_ == pos_->second.end()) {
				++pos_;
				subpos_ = pos_ == pos_end_ ? subpos_end_ : pos_->second.begin();
			}
			return *this;
		}
	};

	class edge_iterable {
	private:
		const umap<Node, umap<Node, Float>> &edges_;
	public:
		inline edge_iterable(const umap<Node, umap<Node, Float>> &edges) : edges_(edges) {}
		inline const edge_iterator begin(void) const {
			return edge_iterator(edges_.begin(), edges_.begin()->second.begin(), edges_.end(), edges_.begin()->second.end());
		}
		inline const edge_iterator end(void) const {
			return edge_iterator(edges_.end(), edges_.begin()->second.end(), edges_.end(), edges_.begin()->second.end());
		}
		inline edge_iterable &operator=(const edge_iterable &) { return *this; }
	};
};

template<typename Node, typename Float>
SimRank<Node, Float>::SimRank(size_t K, Float C, Float D) : K_(K), C_(C), D_(D), delta_(K, 0),
	node_properties_(), in_neighbors_(), edge_weights_(), temp_nodes_(), essential_nodes_() {}

template<typename Node, typename Float>
void SimRank<Node, Float>::reserve(size_t n) {
	node_properties_.reserve(n);
	edge_weights_.reserve(n);
	in_neighbors_.reserve(n);
	temp_nodes_.reserve(n);
	essential_nodes_.reserve(n);
}

template<typename Node, typename Float>
void SimRank<Node, Float>::add_edge(Node head, Node tail, Float weight) {
	node_properties_[head].out_degree += weight;
	node_properties_[tail].in_degree += weight;
	in_neighbors_[tail].insert(head);
	edge_weights_[head][tail] += weight;
}

template<typename Node, typename Float>
void SimRank<Node, Float>::calculate_simrank() {
	normalize_edges();
	// Calculate deltas for threshold sieving
	for (size_t m = 0; m < K_; m++) {
		delta_[m] = (Float)(D_ / (K_ * pow(C_, K_ - m + 1)));
	}
	// Initialize similarity scores
	for (auto const &a_aps_p : node_properties_) {
		Node a = a_aps_p.first;
		node_properties_[a].simrank.clear();
	}
	// Main loop: update scores for K iterations
	for (size_t k = 0; k < K_; k++) {
		for (auto const &a_aps_p : node_properties_) {
			Node a = a_aps_p.first;
			Float a_od = a_aps_p.second.out_degree;
			if (a_od == 0 && k < K_ - 1) { continue; }
			update_simrank_scores(a, k);
		}
	}
}

template<typename Node, typename Float>
Float SimRank<Node, Float>::similarity(Node a, Node b) const {
	// similarity(a, a) == 1
	if (a == b) { return 1; }
	// similarity(a, b) == similarity(b, a), so standardize on a < b
	if (a > b) { std::swap(a, b); }
	auto a_props = node_properties_.at(a);
	auto a_b_simrank = a_props.simrank.find(b);
	if (a_b_simrank == a_props.simrank.end()) { return 0; }
	return a_b_simrank->second;
}

template<typename Node, typename Float>
void SimRank<Node, Float>::normalize_edges() {
	// Divide each edge from a to b by the in-degree of b
	for (auto &a_bws_p : edge_weights_) {
		Node a = a_bws_p.first;
		auto &bws = a_bws_p.second;
		for (auto &b_w_p : bws) {
			Node b = b_w_p.first;
			Float w = b_w_p.second;
			edge_weights_[a][b] = w / node_properties_[b].in_degree;
		}
	}
}

template<typename Node, typename Float>
void SimRank<Node, Float>::update_simrank_scores(Node a, size_t k) {
	// Calculate partial sums for node a's in-neighbors
	for (auto &u_ups_p : node_properties_) {
		Node u = u_ups_p.first;
		Float partial_sum_u = 0;
		for (Node i : in_neighbors_[a]) {
			partial_sum_u += similarity(i, u) * edge_weights_[i][a];
		}
		node_properties_[u].partial_sum = partial_sum_u;
	}
	// Calculate essential paired nodes for node a
	essential_nodes_.clear();
	// Construct set of temporary nodes
	temp_nodes_.clear();
	for (auto const &v_vps_p : node_properties_) {
		Node v = v_vps_p.first;
		for (Node u : in_neighbors_[a]) {
			if (similarity(u, v) > 0) {
				temp_nodes_.push_back(v);
				break;
			}
		}
	}
	// Construct set of essential paired nodes
	for (auto const &b_bps_p : node_properties_) {
		Node b = b_bps_p.first;
		for (Node v : temp_nodes_) {
			if (in_neighbors_[b].find(v) != in_neighbors_[b].end()) {
				essential_nodes_.push_back(b);
				break;
			}
		}
	}
	// Main loop: account for node b's in-neighbors
	for (Node b : essential_nodes_) {
		Float score_a_b = 0;
		for (Node j : in_neighbors_[b]) {
			score_a_b += node_properties_[j].partial_sum * edge_weights_[j][b];
		}
		score_a_b *= C_;
		if (score_a_b > delta_[k] || similarity(a, b) > 0) {
			node_properties_[a].simrank[b] = score_a_b;
		}
	}
}

#endif
