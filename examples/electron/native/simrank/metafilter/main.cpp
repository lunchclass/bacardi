#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <map>

#include "../simrank.hpp"

typedef SimRank<int, float> MeFiSimRank;
MeFiSimRank mfsr(6, 0.6f);
std::map<int, std::string> usernames;

std::string timestamp;

inline std::string username(int id) {
	auto found = usernames.find(id);
	if (found != usernames.end()) { return found->second; }
	return std::string("<") + std::to_string(id) + ">";
}

void read_favorites(const char *filename) {
	std::ifstream ifs(filename);
	std::string line;
	std::getline(ifs, timestamp); // timestamp
	std::getline(ifs, line); // headers
	while (std::getline(ifs, line)) {
		// fave_id \t faver \t favee \t ...
		std::istringstream iss(line);
		int fave_id, faver, favee;
		iss >> fave_id >> faver >> favee;
		mfsr.add_edge(faver, favee);
	}
}

void read_usernames(const char *filename) {
	std::ifstream ifs(filename);
	std::string line;
	std::getline(ifs, line); // timestamp
	std::getline(ifs, line); // headers
	while (std::getline(ifs, line)) {
		// userid \t joindate \t name
		std::istringstream iss(line);
		std::string token;
		std::getline(iss, token, '\t');
		int userid = std::stoi(token);
		std::getline(iss, token, '\t'); // joindate
		std::string name;
		std::getline(iss, name);
		usernames[userid] = name;
	}
}

void print_statistics() {
	// Print timestamp
	std::cout << timestamp << std::endl;

	// Print user-related totals
	std::cout << usernames.size() << " total users" << std::endl;
	std::cout << mfsr.num_nodes() << " users are favers or favees" << std::endl;
	std::cout << mfsr.num_heads() << " users are favers" << std::endl;
	std::cout << mfsr.num_tails() << " users are favees" << std::endl;

	// Calculate favorite-related totals
	size_t num_pairs = 0;
	size_t total_favorites = 0;
	size_t max_favorites = 0; int max_faves_faver = 0, max_faves_favee = 0;
	std::map<size_t, size_t> favorites_histogram;
	for (auto edge : mfsr.edges()) {
		num_pairs++;
		size_t pair_favorites = (size_t)edge.weight;
		total_favorites += pair_favorites;
		if (pair_favorites > max_favorites) {
			max_favorites = pair_favorites;
			max_faves_faver = edge.head;
			max_faves_favee = edge.tail;
		}
		favorites_histogram[pair_favorites]++;
	}
	// Print favorite-related totals
	std::cout << total_favorites << " total favorites" << std::endl;
	std::cout << num_pairs << " unique faver-favee pairs" << std::endl;

	// Print statistical averages
	std::cout << "average " << (total_favorites / mfsr.num_heads()) << " favorites given per faver" << std::endl;
	std::cout << "average " << (total_favorites / mfsr.num_tails()) << " favorites received per favee" << std::endl;
	std::cout << "average " << (total_favorites / num_pairs) << " favorites per faver-favee pair" << std::endl;

	// Calculate statistical maxima
	size_t max_faves_given = 0; int max_faves_given_user = 0;
	size_t max_faves_received = 0; int max_faves_received_user = 0;
	size_t max_favee_count = 0; int max_favee_count_user = 0;
	size_t max_faver_count = 0; int max_faver_count_user = 0;
	std::map<size_t, size_t> favers_histogram, favees_histogram;
	for (int user : mfsr.nodes()) {
		size_t num_faves_given = (size_t)mfsr.out_degree(user);
		if (num_faves_given > max_faves_given) {
			max_faves_given = num_faves_given;
			max_faves_given_user = user;
		}
		favers_histogram[num_faves_given]++;

		size_t num_faves_received = (size_t)mfsr.in_degree(user);
		if (num_faves_received > max_faves_received) {
			max_faves_received = num_faves_received;
			max_faves_received_user = user;
		}
		favees_histogram[num_faves_received]++;

#pragma warning(disable: 4189) // '_': local variable is initialized but not referenced
		size_t num_favee_count = 0;
		for (int _ : mfsr.out_neighbors(user)) { num_favee_count++; }
		if (num_favee_count > max_favee_count) {
			max_favee_count = num_favee_count;
			max_favee_count_user = user;
		}

		size_t num_faver_count = 0;
		for (int _ : mfsr.in_neighbors(user)) { num_faver_count++; }
		if (num_faver_count > max_faver_count) {
			max_faver_count = num_faver_count;
			max_faver_count_user = user;
		}
	}
	// Print maxima
	std::cout << "maximum " << max_faves_given << " favorites given by user #" << max_faves_given_user
		<< " = " << username(max_faves_given_user) << std::endl;
	std::cout << "maximum " << max_faves_received << " favorites received by user #" << max_faves_received_user
		<< " = " << username(max_faves_received_user) << std::endl;
	std::cout << "maximum " << max_favorites << " favorites given by user #" << max_faves_faver << " to user #" << max_faves_favee
		<< " = " << username(max_faves_faver) << " to " << username(max_faves_favee) << std::endl;
	std::cout << "maximum " << max_favee_count << " favees for user #" << max_favee_count_user
		<< " = " << username(max_favee_count_user) << std::endl;
	std::cout << "maximum " << max_faver_count << " favers of user #" << max_faver_count_user
		<< " = " << username(max_faver_count_user) << std::endl;

	std::cout << std::endl;

	// Print histogram data
	// num favorites \t count givers (favers) \t count receivers (favees) \t count faver-favee pairs (connections)
	std::cout << "num_faves\tfaver_count\tfavee_count\tpair_count" << std::endl;
	size_t max_count = std::max(std::max(favers_histogram.rbegin()->first, favees_histogram.rbegin()->first), favorites_histogram.rbegin()->first);
	for (size_t n = 0; n <= max_count; n++) {
		size_t favers_count = favers_histogram[n];
		size_t favees_count = favees_histogram[n];
		size_t favorites_count = favorites_histogram[n];
		if (favers_count || favees_count || favorites_count) {
			std::cout << n << "\t" << favers_count << "\t" << favees_count << "\t" << favorites_count << std::endl;
		}
	}
}

void print_connections() {
	// Print connections with at least 5 favorites (fewer than 10% of the total)
	// faver ID \t favee ID \t faver name \t favee name \t count \t percent (instead of 1 favorite per line)
	std::cout << "faver_id\tfavee_id\tfaver_name\tfavee_name\tcount\tpercent" << std::endl;
	std::cout.precision(6);
	std::cout.setf(std::ios::fixed);
	for (auto edge : mfsr.edges()) {
		if (edge.weight > 4) {
			float percent = 100 * edge.weight / mfsr.out_degree(edge.head);
			std::cout << edge.head << "\t" << edge.tail << "\t" << username(edge.head) << "\t" << username(edge.tail) << "\t"
				<< (int)edge.weight << "\t" << percent << std::endl;
		}
	}
}

void run_simrank() {
	// Print SimRank parameters
	std::cout << "SimRank: K = " << mfsr.K() << ", C = " << mfsr.C() << ", D = " << mfsr.D() << std::endl;
	// TODO: run SimRank on the significant subset of data
}

int main(int argc, char *argv[]) {
	const char *favoritesdata_txt = argc > 1 ? argv[1] : "favoritesdata.txt";
	const char *usernames_txt = argc > 2 ? argv[2] : "usernames.txt";
	read_favorites(favoritesdata_txt);
	read_usernames(usernames_txt);
	print_statistics();
	std::cout << std::endl;
	print_connections();
	std::cout << std::endl;
	run_simrank();
	return 0;
}
